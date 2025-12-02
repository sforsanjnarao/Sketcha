'use client'
import { Tldraw, Editor, HistoryEntry } from 'tldraw'
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

  // 1. Handle Mounting the Editor
  const handleMount = (editorInstance: Editor) => {
    setEditor(editorInstance)
    
    // LISTEN TO LOCAL CHANGES (What YOU draw)
    editorInstance.store.listen(
        (entry: HistoryEntry<any>) => {
            // Only handle changes initiated by the user
            if (entry.source !== 'user') return

            const { changes } = entry
            
            // If the socket is open, send the diff
            if (socket?.readyState === WebSocket.OPEN) {
                // We optimize by checking if there are actual changes
                if (
                    Object.keys(changes.added).length || 
                    Object.keys(changes.updated).length || 
                    Object.keys(changes.removed).length
                ) {
                    socket.send(JSON.stringify({
                        type: 'canvas-update',
                        roomId:  Number(roomId),
                        data: changes // Send only the diff
                    }))
                }
            }
        },
        { source: 'user', scope: 'document' } // Options
    )
  }

  // 2. LISTEN TO SOCKET (What OTHERS draw)
  useEffect(() => {
    if (!socket || !editor) return

    const handleMessage = (event: MessageEvent) => {
      try {
        const msg = JSON.parse(event.data)

        // Only handle canvas updates
        if (msg.type === 'canvas-update') {
            // mergeRemoteChanges applies the update without triggering the 'user' listener above
            editor.store.mergeRemoteChanges(() => {
                const { added, updated, removed } = msg.data
                
                // Tldraw internals to apply diffs
                if (added) {
                    for (const record of Object.values(added)) {
                        editor.store.put([record as any])
                    }
                }
                if (updated) {
                    for (const [, record] of Object.entries(updated)) {
                        editor.store.put([(record as any).to])
                    }
                }
                if (removed) {
                    for (const id of Object.keys(removed)) {
                        editor.store.remove([id as any])
                    }
                }
            })
        }
      } catch (e) {
        console.error('Error parsing canvas msg', e)
      }
    }

    socket.addEventListener('message', handleMessage)
    
    // Cleanup listener on unmount
    return () => {
        socket.removeEventListener('message', handleMessage)
    }
  }, [socket, editor])

  return (
    <div className="w-full h-[600px] border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <Tldraw 
        onMount={handleMount} 
        // persistenceKey keeps data in LocalStorage if they refresh
        persistenceKey={`room-${roomId}`} 
      />
    </div>
  )
}