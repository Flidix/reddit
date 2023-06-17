import {Request, Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req} from '@nestjs/common';
import { TrendService } from './trend.service';
import { CreateTrendDto } from './dto/create-trend.dto';
import {CreateCommentDto} from "./dto/create-comment.dto";
import {ObjectId} from "mongoose";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Trend} from "./schema/trend.schema";
import {AddCommentToCommentDto} from "./dto/add-commentToComment.dto";
@UseGuards(JwtAuthGuard)
@Controller('/trend')
export class TrendController {
  constructor(private readonly trendService: TrendService) {}



  @Post()
  async create(@Body() createTrendDto: CreateTrendDto, @Req() req: any): Promise<Trend> {
    const token = req.headers['authorization'].split(' ')[1]; // Отримайте JWT-токен з заголовків запиту
    return this.trendService.create(createTrendDto, token);
  }


  @Get()
  findAll() {
    return this.trendService.findAll();
  }

  @Get('/search')
  search(@Query('query')query: string){
    return this.trendService.search(query)
  }

  @Post('/comment')
  addComment(@Body() dto: CreateCommentDto, @Request() req) {
    const token = req.headers.authorization.split(' ')[1]; // Отримайте JWT-токен з заголовка Authorization
    return this.trendService.addComment(dto, token);
  }

  @Post('/commentIn')
  addCommentIn(@Body() dto: AddCommentToCommentDto, @Request() req) {
    const token = req.headers.authorization.split(' ')[1]; // Отримайте JWT-токен з заголовка Authorization
    return this.trendService.addCommentIn(dto, token);
  }


  @Post('like/:trendId')
  async toggleLike(@Param('trendId') trendId: string, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1]; // Отримайте JWT-токен з заголовка Authorization

    return await this.trendService.toggleLike(trendId,  token)
  }

  @Post('likeComment/:commentId')
  async addCommentLike(@Param('commentId') commentId: string, @Request() req: any) {
    const token = req.headers.authorization.split(' ')[1]; // Отримайте JWT-токен з заголовка Authorization

    return await this.trendService.addLikeToComment(commentId,  token)
  }


  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.trendService.getOne(id)
  }

  @Get('likes/:id')
  getOneLikes(@Param('id') id: ObjectId) {
    return this.trendService.getOneAndPopulateLikes(id)
  }
}
