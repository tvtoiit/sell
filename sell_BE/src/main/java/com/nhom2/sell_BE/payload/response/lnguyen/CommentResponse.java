package com.nhom2.sell_BE.payload.response.lnguyen;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nhom2.sell_BE.entities.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class CommentResponse {

    private String commentId;

    private String contentComment;

    private int numberStars;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timeComment;

    private String fullName;

    private String productId;

    public CommentResponse(Comment comment){
        this.commentId = comment.getCommentId();
        this.contentComment = comment.getContentComment();
        this.numberStars = comment.getNumberStars();
        this.timeComment = comment.getTimeComment();
        this.fullName = comment.getUser().getFullName();
        this.productId = comment.getProduct().getProductId();
    }
}
