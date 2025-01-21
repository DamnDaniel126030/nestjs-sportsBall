import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamsService {

  constructor (private readonly db: PrismaService){}

  create(createTeamDto: CreateTeamDto) {
    return this.db.team.create({
      data: createTeamDto
    })
  }

  addPlayer(id: number, playerId: number){
    return this.db.team.update({
      data: {
        players: {
          connect: {id: playerId}
        }
      },
      where :{
        id: id,
      }
    })
  }

  players(){
    return this.db.team.findMany({
      include: {
        players: true
      }
    })
  }

  findAll() {
    return this.db.team.findMany();
  }

  findOne(id: number) {
    return this.db.team.findUnique({
      where: {
        id: id
      }
    })
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.db.team.update({
      data: updateTeamDto,
      where: {
        id: id
      }
    })
  }

  remove(id: number) {
    return this.db.team.delete({
      where: {
        id: id
      }
    })
  }
}
