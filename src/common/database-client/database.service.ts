import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { Component } from '../../types/component.type.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { DatabaseInterface } from './database.interface.js';

@injectable()
export default class DatabaseService implements DatabaseInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
  ) { }

  public async connect(uri: string): Promise<void> {
    this.logger.info('Trying to connect to MongoDB...');
    await mongoose.connect(uri);
    this.logger.info('Connection to database has established.');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    this.logger.info('Connection to database has closed.');
  }
}
