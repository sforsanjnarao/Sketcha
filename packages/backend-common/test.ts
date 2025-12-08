import { prisma } from "@repo/db2";

async function testPrismaInBackendCommon() {
  try {
    console.log("Testing Prisma connection in backend-common package...\n");

    console.log("1️ Creating a test user...");
    const testUser = await prisma.user.create({
      data: {
        name: "Backend Common Test User",
        email: `backend-common-test-${Date.now()}@example.com`,
        password: "hashedpassword123",
        photo: "https://example.com/photo.jpg",
      },
    });
    console.log("User created:", testUser);

    console.log("\n2️ Fetching the created user...");
    const fetchedUser = await prisma.user.findUnique({
      where: { id: testUser.id },
    });
    console.log("User fetched:", fetchedUser);

    console.log("\n3️ Creating a test room...");
    const testRoom = await prisma.room.create({
      data: {
        slug: `backend-common-room-${Date.now()}`,
        adminId: testUser.id,
      },
      include: {
        admin: true,
      },
    });
    console.log("Room created:", testRoom);

    console.log("\n4️ Creating a test chat message...");
    const testChat = await prisma.chat.create({
      data: {
        message: "Hello from backend-common test!",
        roomId: testRoom.id,
        userId: testUser.id,
      },
      include: {
        user: true,
        room: true,
      },
    });
    console.log("Chat created:", testChat);

    console.log("\n5️ Fetching user with all relations...");
    const userWithRelations = await prisma.user.findUnique({
      where: { id: testUser.id },
      include: {
        room: true,
        chat: true,
      },
    });
    console.log("User with relations:", userWithRelations);

    // console.log("\n🧹 Cleaning up test data...");
    // await prisma.chat.delete({ where: { id: testChat.id } });
    // await prisma.room.delete({ where: { id: testRoom.id } });
    // await prisma.user.delete({ where: { id: testUser.id } });
    // console.log("Cleanup completed");

    console.log("All tests passed! Prisma is working correctly in backend-common package.");
  } catch (error) {
    console.error("Error during Prisma test in backend-common:");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log("Prisma disconnected");
  }
}

testPrismaInBackendCommon();

