const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function newTask(parent, args, context, info) {
    const { id } = await context.prisma.user.findFirst({
        where: { username: "test" }
    });

    const newTask = await prisma.task.create({
        data: {
            name: args.name,
            createdBy: {
                connect: { id: id }
            }
        }
    });
    context.pubsub.publish('NEW_TASK', newTask);

    return newTask;
}

async function completeTask(parent, args, context, info) {
    const task = await context.prisma.task.update({
        where: {
            id: args.id
        },
        data: {
            completed: true
        }
    });
    context.pubsub.publish('COMPLETED_TASK', task);

    return task;
}
async function removeTask(parent, args, context, info) {
    const task = await context.prisma.task.delete({
        where: {
            id: args.taskId
        }
    });
    context.pubsub.publish('DELETED_TASK', task);

    return task;
}

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await context.prisma.user.create({
        data: { ...args, password }
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user
    };
}

async function login(parent, args, context, info) {
    // findUnique({
    //     where: { email: args.email }
    // })
    const user = await context.prisma.user.findFirst({
        where: { username: args.username }
    });
    if (!user) {
        throw new Error('No such user found');
    }

    const valid = await bcrypt.compare(
        args.password,
        user.password
    );
    if (!valid) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user
    };
}

module.exports = {
    newTask,
    completeTask,
    removeTask,
    signup,
    login,
};
