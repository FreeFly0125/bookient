import { Request, Response } from "express";
import { AppDataSource } from "./../database/data-source";
import { Author } from "./../entities/Author";
import { ResponseUtil } from "./../utils/Response";

export class AuthorsController {
  async getAuthors(req: Request, res: Response): Promise<Response> {
    const authors = await AppDataSource.getRepository(Author).find();
    return ResponseUtil.sendResponse(res, authors, 200);
  }

  async getAuthor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const author = await AppDataSource.getRepository(Author).findOneBy({
      id: parseInt(req.params.id),
    });
    if (!author) {
      return ResponseUtil.sendError(res, "Author not found", 404);
    }
    return ResponseUtil.sendResponse(res, author, 200);
  }

  async createAuthor(req: Request, res: Response, next): Promise<Response> {
    const authorData = req.body;
    const repo = AppDataSource.getRepository(Author);
    const author = repo.create(authorData);
    await repo.save(author);
    return ResponseUtil.sendResponse(res, author, 201);
  }

  async updateAuthor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const authorData = req.body;
    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneBy({
      id: parseInt(req.params.id),
    });
    if (!author) {
      return ResponseUtil.sendError(res, "Author not found", 404);
    }
    repo.merge(author, authorData);
    await repo.save(author);
    return ResponseUtil.sendResponse(res, author);
  }

  async deleteAuthor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneBy({
      id: parseInt(req.params.id),
    });
    if (!author) {
      return ResponseUtil.sendError(res, "author not found", 404);
    }
    await repo.remove(author);
    return ResponseUtil.sendResponse(res, null);
  }
}