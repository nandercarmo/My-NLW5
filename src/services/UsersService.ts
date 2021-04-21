import { getCustomRepository, Repository } from "typeorm";

import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/User";

interface IUserCreate {

	email: string;
}

class UsersService {

	private usersRepository: Repository<User>;

	constructor() {

		this.usersRepository = getCustomRepository(UsersRepository);
	}

	async create({ email }: IUserCreate) {

		const user = await this.usersRepository.findOne({
			email
		});

		if(user) {

			return user;
		
		} else {

			const newUser = this.usersRepository.create({
				email
			});
	
			await this.usersRepository.save(newUser);
			return newUser;
		}
	};
};

export { UsersService };