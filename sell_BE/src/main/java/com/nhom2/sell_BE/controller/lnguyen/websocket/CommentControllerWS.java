package com.nhom2.sell_BE.controller.lnguyen.websocket;

import com.nhom2.sell_BE.payload.request.CommentRequest;
import com.nhom2.sell_BE.payload.response.lnguyen.CommentResponse;
import com.nhom2.sell_BE.services.lnguyen.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CommentControllerWS {

    @Autowired
    private CommentService commentService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/comments")
    @SendTo("/topic/comments")
    public List<CommentResponse> getComment(@Payload String productId){
        return commentService.getAllCommentByProduct(productId);
    }
    @MessageMapping("/comment")
    @SendTo("/topic/comment")
    public CommentResponse createCommentWS(@Payload CommentRequest commentRequest, StompHeaderAccessor headers){
        String bearerToken = headers.getFirstNativeHeader("Authorization");
        String jwtToken = bearerToken.substring(7);
        CommentResponse comment = commentService.createCommentWS(commentRequest,jwtToken);
        simpMessagingTemplate.convertAndSend("/topic/createComment",comment);
        return comment;
    }
}
