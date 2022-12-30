export const getSender = (loginedUser , users) => {
    return users[0]._id === loginedUser._id ? users[1] : users[0]
}