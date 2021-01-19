async function tasks(parent, args, context, info) {
    const tasks = await context.prisma.task.findMany({
        where: {
            createdBy: {
                username: args.username
            }
        }
    });
    return tasks;
}

module.exports = {
    tasks
};
