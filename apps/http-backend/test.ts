import { prismaClient } from "@repo/db/prismaClient";

async function testPrismaInHttpBackend() {
  try {
    console.log("Testing Prisma connection in http-backend...\n");

    console.log("1️⃣ Creating a test user...");
    const testUser = await prismaClient.user.create({
      data: {
        name: "HTTP Backend Test User",
        email: `http-backend-test-${Date.now()}@example.com`,
        password: "hashedpassword123",
        photo: "https://example.com/photo.jpg",
      },
    });
    console.log("User created:", testUser);

    console.log("\n2️⃣ Fetching the created user...");
    const fetchedUser = await prismaClient.user.findUnique({
      where: { id: testUser.id },
    });
    console.log("User fetched:", fetchedUser);

    console.log("\n3️⃣ Creating a test room...");
    const testRoom = await prismaClient.room.create({
      data: {
        slug: `http-backend-room-${Date.now()}`,
        adminId: testUser.id,
      },
      include: {
        admin: true,
      },
    });
    console.log("Room created:", testRoom);

    console.log("\n4️⃣ Creating a test chat message...");
    const testChat = await prismaClient.chat.create({
      data: {
        message: "Hello from http-backend test!",
        roomId: testRoom.id,
        userId: testUser.id,
      },
      include: {
        user: true,
        room: true,
      },
    });
    console.log("Chat created:", testChat);

    console.log("\n5️⃣ Fetching user with all relations...");
    const userWithRelations = await prismaClient.user.findUnique({
      where: { id: testUser.id },
      include: {
        room: true,
        chat: true,
      },
    });
    console.log("User with relations:", userWithRelations);

    // console.log("\n🧹 Cleaning up test data...");
    // await prismaClient.chat.delete({ where: { id: testChat.id } });
    // await prismaClient.room.delete({ where: { id: testRoom.id } });
    // await prismaClient.user.delete({ where: { id: testUser.id } });
    console.log("Cleanup completed");

    console.log("\n✅ All tests passed! Prisma is working correctly in http-backend.");
  } catch (error) {
    console.error("❌ Error during Prisma test in http-backend:");
    console.error(error);
  } finally {
    await prismaClient.$disconnect();
    console.log("Prisma disconnected");
  }
}

testPrismaInHttpBackend();

