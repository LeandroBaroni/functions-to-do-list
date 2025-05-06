import { singleton } from "tsyringe";
import { DeleteParams } from "./index";

@singleton()
export class DeleteUseCase {
  execute (data: DeleteParams) {
    console.log(data);
  }
}