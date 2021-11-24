const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const userWithPost = await prisma.user.create({
    data: {
      name: 'Alice',
      Post: {
        create: {
          title: 'Hello World from Alice',
        },
      },
    },
    include: {
      Post: true,
    },
  })
  console.log(userWithPost)

  const anotherUserWithPost = await prisma.anotherUser.create({
    data: {
      firstName: 'Bob',
      lastName: 'Smith',
      AnotherPost: {
        create: {
          title: 'Hello World from Bob',
        },
      },
    },
    include: {
      AnotherPost: true,
    },
  })
  console.log(anotherUserWithPost)
}

main()