function tasks(parent, args, context) {
    return context.prisma.user
        .findUnique({ where: { id: parent.id } })
        .tasks();
}

module.exports = {
    tasks
};
