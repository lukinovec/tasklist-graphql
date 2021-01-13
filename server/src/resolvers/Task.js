function createdBy(parent, args, context) {
    return context.prisma.task
        .findUnique({ where: { id: parent.id } })
        .createdBy();
}

module.exports = {
    createdBy
};
