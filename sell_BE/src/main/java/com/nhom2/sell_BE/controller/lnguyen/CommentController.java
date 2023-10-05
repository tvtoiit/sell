package com.nhom2.sell_BE.controller.lnguyen;

import com.nhom2.sell_BE.payload.request.CommentRequest;
import com.nhom2.sell_BE.services.lnguyen.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/{product-id}")
    public ResponseEntity<?> getAllCommentByProduct(@PathVariable("product-id") String productId) {
        return new ResponseEntity<>(commentService.getAllCommentByProduct(productId), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<?> createComment(@RequestBody CommentRequest commentRequest)  {
        return new ResponseEntity<>(commentService.createComment(commentRequest), HttpStatus.OK);
    }
}
