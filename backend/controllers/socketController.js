

const User = require('../models/userModel');
const PrivateMessage = require('../models/privateMessageModel');


const SocketController = {

    sendFriendRequest: async (socket, data) => {
        const { currentUserId, otherUserId } = data;

        try {
            const currentUser = await User.findById(currentUserId);
            const otherUser = await User.findById(otherUserId);

            if (!currentUser || !otherUser) {
                throw new Error('User not found');
            }

            const alreadySent = otherUser.friendRequests.some(request => request.senderId.toString() === currentUserId);
            if (alreadySent) {
                throw new Error('Friend request already sent');
            }

            otherUser.friendRequests.push({ senderId: currentUserId });
            await otherUser.save();

            socket.emit('sendFriendRequestResponse', { success: true, message: 'Friend request sent' });
        } catch (error) {
            socket.emit('sendFriendRequestResponse', { success: false, message: error.message });
        }
    },



    acceptFriendRequest: async (socket, data) => {
        const { currentUserId, senderId } = data;

        try {
            const user = await User.findById(currentUserId);
            const sender = await User.findById(senderId);

            if (!user || !sender) {
                throw new Error('User not found');
            }

            if (user.friends.includes(senderId)) {
                throw new Error('You are already friends');
            }

            const requestIndex = user.friendRequests.findIndex(request => request.senderId.toString() === senderId);
            // if (requestIndex === -1) {
            //     throw new Error('Friend request not found');
            // }

            // user.friendRequests[requestIndex].status = 'accepted';
            user.friends.push(senderId);
            sender.friends.push(currentUserId);

            user.friendRequests.splice(requestIndex, 1);

            await user.save();
            await sender.save();

            socket.emit('acceptFriendRequestResponse', { success: true, message: 'Friend request accepted' });
        } catch (error) {
            socket.emit('acceptFriendRequestResponse', { success: false, message: error.message });
        }
    },



    declineFriendRequest: async (socket, data) => {
        const { currentUserId, senderId } = data;

        try {
            const user = await User.findById(currentUserId);

            if (!user) {
                throw new Error('User not found');
            }

            const requestIndex = user.friendRequests.findIndex(request => request.senderId.toString() === senderId);
            // if (requestIndex === -1) {
            //     throw new Error('Friend request not found');
            // }

            user.friendRequests.splice(requestIndex, 1);
            await user.save();

            socket.emit('declineFriendRequestResponse', { success: true, message: 'Friend request declined' });
        } catch (error) {
            socket.emit('declineFriendRequestResponse', { success: false, message: error.message });
        }
    },



    fetchFriendshipInfo: async (socket, data) => {
        const { currentUserId, otherUserId } = data;

        try {
            const user = await User.findById(currentUserId)/* .populate('friends'); */
            const otherUser = await User.findById(otherUserId);

            if (!user || !otherUser) {
                throw new Error('User not found');
            }

            const isFriend = user.friends.some(friend => friend._id.toString() === otherUserId);
            const isRequestSent = otherUser.friendRequests.some(request => request.senderId.toString() === currentUserId);
            const isRequestReceived = user.friendRequests.some(request => request.senderId.toString() === otherUserId);


            socket.emit('fetchFriendshipInfoResponse', {
                success: true,
                isFriend,
                isRequestSent,
                isRequestReceived,
            });
        } catch (error) {
            socket.emit('fetchFriendshipInfoResponse', { success: false, message: error.message });
        }
    },



    fetchFriendRequests: async (socket, data) => {
        const { userId } = data;

        try {
            const user = await User.findById(userId).populate('friendRequests.senderId');
            if (!user) {
                throw new Error('User not found');
            }

            socket.emit('fetchFriendRequestsResponse', { success: true, friendRequests: user.friendRequests });
        } catch (error) {
            socket.emit('fetchFriendRequestsResponse', { success: false, message: error.message });
        }
    },



    fetchFriends: async (socket, data) => {
        const { userId } = data;

        try {
            const user = await User.findById(userId).populate('friends', 'username profileImageUrl');
            if (!user) {
                throw new Error('User not found');
            }

            socket.emit('fetchFriendsResponse', { success: true, friends: user.friends });
        } catch (error) {
            socket.emit('fetchFriendsResponse', { success: false, message: error.message });
        }
    },



    sendPrivateMessage: async (socket, data) => {
        const { currentUserId, otherUserId, content } = data;

        try {
            const currentUser = await User.findById(currentUserId);
            const otherUser = await User.findById(otherUserId);

            if (!currentUser || !otherUser) {
                throw new Error('User not found');
            }

            const newPrivateMessage = new PrivateMessage({
                senderId: currentUserId,
                receiverId: otherUserId,
                content: content,
            });

            await newPrivateMessage.save();

            socket.to(otherUserId).emit('receivePrivateMessage', {
                senderId: currentUserId,
                message: content,
                createdAt: newPrivateMessage.createdAt,
            });

            socket.emit('sendPrivateMessageResponse', {
                success: true,
                message: 'Message sent successfully',
                createdAt: newPrivateMessage.createdAt,
            });
        } catch (error) {
            socket.emit('sendPrivateMessageResponse', {
                success: false,
                message: error.message,
            });
        }
    },




    fetchPrivateMessages: async (socket, data) => {
        const { currentUserId, otherUserId } = data;

        try {
            const user = await User.findById(currentUserId);
            if (!user) {
                throw new Error('User not found');
            }

            const messageHistory = await PrivateMessage.find({
                $or: [
                    { senderId: currentUserId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: currentUserId },
                ],
            }).sort({ createdAt: 1 });

            socket.emit('fetchMessagesResponse', { success: true, messages: messageHistory });
        } catch (error) {
            socket.emit('fetchMessagesResponse', { success: false, message: error.message });
        }
    },




}




module.exports = SocketController;
