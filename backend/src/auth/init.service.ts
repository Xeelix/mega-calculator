import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class InitService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async initializeTestAccounts() {
    const testAccounts = [
      {
        username: 'testuser1',
        password: 'testpass1',
      },
      {
        username: 'testuser2',
        password: 'testpass2',
      },
    ];

    for (const account of testAccounts) {
      const existingUser = await this.userModel
        .findOne({ username: account.username })
        .exec();
      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(account.password, 10);
        await this.userModel.create({
          username: account.username,
          password: hashedPassword,
          calculatorState: {
            memory: 0,
            currentExpression: '',
          },
          createdAt: new Date(),
        });
        console.log(`Created test account: ${account.username}`);
      }
    }
  }
}
