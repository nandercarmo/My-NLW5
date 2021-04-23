import { getCustomRepository, Repository } from "typeorm";

import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {

	socket_id: string;
	user_id: string;
	admin_id?: string;
	id?: string;
}

interface IConnectionFindUserId {

	user_id: string;
}

interface IConnectionFindSocketId {

	socket_id: string;
}

interface IConnectionUpdateAdminId {

	user_id: string;
	admin_id: string;
}

class ConnectionsService {

	private connectionsRepository: Repository<Connection>

	constructor() {

		this.connectionsRepository = getCustomRepository(ConnectionsRepository);
	}

	async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {

		const connection = this.connectionsRepository.create({
			socket_id,
			user_id,
			admin_id,
			id
		});

		await this.connectionsRepository.save(connection);

		return connection;
	}

	async findByUserId({ user_id }: IConnectionFindUserId) {

		const connection = await this.connectionsRepository.findOne({
			user_id
		});

		return connection;
	}

	async findAllWithoutAdmin() {

		const connections = await this.connectionsRepository.find({

			where: { admin_id: null },
			relations: ["user"],
		});

		return connections;
	}

	async findBySocketId({ socket_id }: IConnectionFindSocketId) {

		const connection = await this.connectionsRepository.findOne({

			where: { socket_id: socket_id },
			relations: ["user"],
		});

		console.log(connection);

		return connection;
	}

	async updateAdminId({ user_id, admin_id }: IConnectionUpdateAdminId) {

		await this.connectionsRepository
			.createQueryBuilder()
			.update(Connection)
			.set({ admin_id })
			.where("user_id = :user_id", { user_id })
			.execute();
	}
}

export { ConnectionsService };