package com.nhom2.sell_BE.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class CommentRequest {

    private String contentComment;

    private int numberStars;

    private String productId;
}
