import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class PlayersService {

  constructor(private readonly db: PrismaService){}


  create(createPlayerDto: CreatePlayerDto) {
    return this.db.player.create({
      data: {
        ...createPlayerDto,
      }
    })
  }

  findAll() {
    return this.db.player.findMany();
  }

  findOne(id: number) {
    return this.db.player.findUnique({
      where: {
        id: id
      }
    })
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.db.player.update({
      data: updatePlayerDto,
      where: {
        id: id
      }
    })
  }

  remove(id: number) {
    return this.db.player.delete({
      where: {
        id: id
      }
    })
  }
}
