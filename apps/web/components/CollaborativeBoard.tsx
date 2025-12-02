'use client'
import { 
  Tldraw, 
  Editor, 
  HistoryEntry, 
  TLRecord, 
  RecordsDiff 
} from 'tldraw'
import 'tldraw/tldraw.css'
import { useEffect, useState } from 'react'

export default function CollaborativeBoard({ 
  socket, 
  roomId 
}: { 
  socket: WebSocket | undefined, 
  roomId: string 
}) {
  const [editor, setEditor] = useState<Editor>()

  const handleMount = (editorInstance: Editor) => {
    setEditor(editorInstance)
    
    // Type the entry explicitly, though TS often infers this automatically
    editorInstance.store.listen(
        (entry: HistoryEntry<TLRecord>) => {
            if (entry.source !== 'user') return

            const { changes } = entry
            
            if (socket?.readyState === WebSocket.OPEN) {
                if (
                    Object.keys(changes.added).length || 
                    Object.keys(changes.updated).length || 
                    Object.keys(changes.removed).length
                ) {
                    socket.send(JSON.stringify({
                        type: 'canvas-update',
                        roomId: Number(roomId),
                        data: changes 
                    }))
                }
            }
        },
        { source: 'user', scope: 'document' }
    )
  }

  useEffect(() => {
    if (!socket || !editor) return

    const handleMessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data)

        if (msg.type === 'canvas-update') {
            const changes = msg.data as RecordsDiff<TLRecord>

            editor.store.mergeRemoteChanges(() => {
                const { added, updated, removed } = changes
                
                if (added) {
                    for (const record of Object.values(added)) {
                        editor.store.put([record])
                    }
                }
                
                if (updated) {
                    // 'updated' is a map of ID -> [prev, next]
                    for (const [, [ to]] of Object.entries(updated)) {
                        editor.store.put([to])
                    }
                }
                
                if (removed) {
                    for (const id of Object.keys(removed)) {
                         // tldraw IDs are typed, so we cast to specific ID type if strict
                        editor.store.remove([id as TLRecord['id']])
                    }
                }
            })
        }
      } catch (e) {
        console.error('Error parsing canvas msg', e)
      }
    }

    socket.addEventListener('message', handleMessage)
    return () => {
        socket.removeEventListener('message', handleMessage)
    }
  }, [socket, editor])

  return (
    <div className="w-full h-[600px] border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <Tldraw 
        onMount={handleMount} 
        persistenceKey={`room-${roomId}`} 
      />
    </div>
  )
}