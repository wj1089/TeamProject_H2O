var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        //ocket은 커넥션이 성공했을 때 커넥션에 대한 정보를 담고 있는 변수
        socket.join(data.roomId);
        //그룹에 들어가기
        socket.room = data.roomId;
        const sockets = io.of('/').in().adapter.rooms[data.roomId];
        //네임스페이스. io.of('/주소')
        //sockets에 방의 정보를 호출하여 배열에 저장
        if(sockets.length===1){
            socket.emit('init')
            //emit = 이벤트를 보내기 위해 사용되는 함수
        }else{
            if (sockets.length===2){
                io.to(data.roomId).emit('ready')
                //특정 룸에 이벤트 보내기
            }else{
                socket.room = null
                socket.leave(data.roomId)
                socket.emit('full')
            }
            
        }
    });
    socket.on('signal', (data) => {
        io.to(data.room).emit('desc', data.desc)
        console.log("desc:"+JSON.stringify(data))
    })
    socket.on('disconnect', () => {
        //disconnect 이벤트는 클라이언트와의 연결이 끊어졌을 때 발생
        const roomId = Object.keys(socket.adapter.rooms)[0]
        console.log("서버연결끊김")
        if (socket.room){
            io.to(socket.room).emit('disconnected')
        }
        
    })
});
