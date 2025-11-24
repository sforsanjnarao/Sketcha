import { prismaClient } from "./src/index.js";

async function testPrismaWithPersistentData() {
  try {
    console.log("🔄 Creating test data that will persist...\n");

    console.log("1️⃣ Creating a test user...");
    const testUser = await prismaClient.user.create({
      data: {
        name: "Persistent Test User",
        email: `persistent-test-${Date.now()}@example.com`,
        password: "hashedpassword123",
        photo: "https://example.com/photo.jpg",
      },
    });
    console.log("✅ User created:", testUser);

    console.log("\n2️⃣ Creating a test room...");
    const testRoom = await prismaClient.room.create({
      data: {
        slug: `persistent-room-${Date.now()}`,
        adminId: testUser.id,
      },
      include: {
        admin: true,
      },
    });
    console.log("✅ Room created:", testRoom);

    console.log("\n3️⃣ Creating a test chat message...");
    const testChat = await prismaClient.chat.create({
      data: {
        message: "This message will stay in the database!",
        roomId: testRoom.id,
        userId: testUser.id,
      },
      include: {
        user: true,
        room: true,
      },
    });
    console.log("✅ Chat created:", testChat);

    console.log("\n4️⃣ Fetching user with all relations...");
    const userWithRelations = await prismaClient.user.findUnique({
      where: { id: testUser.id },
      include: {
        room: true,
        chat: true,
      },
    });
    console.log("✅ User with relations:", userWithRelations);

    console.log("\n✨ Data created successfully and will persist in database!");
    console.log("\n📊 You can now view this data in Prisma Studio:");
    console.log("   Run: pnpm db:studio");
    console.log("\n📝 Created records:");
    console.log(`   - User ID: ${testUser.id}`);
    console.log(`   - Room ID: ${testRoom.id}`);
    console.log(`   - Chat ID: ${testChat.id}`);
  } catch (error) {
    console.error("\n❌ Error during Prisma test:");
    console.error(error);
    process.exit(1);
  } finally {
    await prismaClient.$disconnect();
    console.log("\n🔌 Prisma disconnected");
  }
}

testPrismaWithPersistentData();

