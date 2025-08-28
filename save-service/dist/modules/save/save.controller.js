"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveController = void 0;
const common_1 = require("@nestjs/common");
const save_dto_1 = require("./dto/save.dto");
const save_service_1 = require("./save.service");
let SaveController = class SaveController {
    saveService;
    constructor(saveService) {
        this.saveService = saveService;
    }
    async saveData(body) {
        const user = await this.saveService.saveUserDetails(body.name, body.email, body.message);
        return {
            message: 'User details saved successfully',
            user,
        };
    }
};
exports.SaveController = SaveController;
__decorate([
    (0, common_1.Post)('user-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_dto_1.CreateUserDetailsDto]),
    __metadata("design:returntype", Promise)
], SaveController.prototype, "saveData", null);
exports.SaveController = SaveController = __decorate([
    (0, common_1.Controller)('save'),
    __metadata("design:paramtypes", [save_service_1.SaveService])
], SaveController);
//# sourceMappingURL=save.controller.js.map