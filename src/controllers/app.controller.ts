import { JsonController, Get } from "routing-controllers";

@JsonController()
export class AppController {
  @Get("/health")
  getHealthcheck() {
    return { health: true };
  }
}
