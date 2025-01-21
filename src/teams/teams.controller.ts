import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get('players')
  showTeamsWithPlayers(){
    return this.teamsService.players();
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    const team = await this.teamsService.findOne(+id);
    if (team == null) {
      throw new NotFoundException("Nincs ilyen ID-val rendelkező csapat");
    }
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    try {
      const teamToUpdate = await this.teamsService.update(+id, updateTeamDto);
      return teamToUpdate;
    }
    catch {
      throw new NotFoundException("Nincs ilyen ID-val rendelkező csapat, így nem sikerült az adatok frissítése")
    }
  }

  @Post(':id/addPlayer/:playerId')
  async addPlayer(@Param('id') id: string, @Param('playerId') playerId: string){
    try {
      const playerToTeam = await this.teamsService.addPlayer(+id, +playerId);
      return playerToTeam;
    }
    catch {
      throw new NotFoundException("Ezzel az ID-val játékos/csapat nem létezik")
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const teamToRemove = await this.teamsService.remove(+id);
      return teamToRemove;
    }
    catch {
      throw new NotFoundException("Nincs ilyen ID-val rendelkező csapat, így nem sikerült az adatok")
    }
  }
}
