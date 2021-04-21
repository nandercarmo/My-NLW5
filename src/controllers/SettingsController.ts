import { Request, Response } from "express";
import { SettingsService } from "../services/SettingsService";

class SettingsController {

	async create(request: Request, response: Response): Promise<Response> {

		const { chat, username } = request.body;

		const settingsSerice = new SettingsService();

		try {
			
			const settings = await settingsSerice.create({ chat, username });
			return response.json(settings);

		} catch (error) {
			
			return response.status(400).json({
				message: error.message
			});
		}
	}
};

export { SettingsController };