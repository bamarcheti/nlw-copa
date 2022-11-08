import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      avatarUrl: 'https://github.com/diego3g.png',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-24T15:00:00.768Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'SE',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 2,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-28T12:00:00.768Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'SW',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-12-02T15:00:00.768Z',
      firstTeamCountryCode: 'CM',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 5,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main()