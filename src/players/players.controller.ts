import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    try {
      return this.playersService.create(createPlayerDto);
    }
    catch {
      throw new BadRequestException("Érvénytelen csapat ID")
    }
  }

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const player = await this.playersService.findOne(+id);
    if (player == null){
      throw new NotFoundException("Nincs ilyen ID-val rendelkező játékos")
    }
    return player;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    try {
      const playerToUpdate = await this.playersService.update(+id, updatePlayerDto);
      return playerToUpdate;
    }
    catch {
      throw new NotFoundException("Nincs ilyen ID-val rendelkező játékos, így nem sikerült az adatok frissítése")
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const playerToRemove = await this.playersService.remove(+id);
      return playerToRemove;
    }
    catch {
      throw new NotFoundException("Nincs ilyen ID-val rendelkező játékos, így nem sikerült az adatok törlése")
    }
  }
}
