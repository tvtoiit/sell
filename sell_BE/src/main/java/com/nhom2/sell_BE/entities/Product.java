package com.nhom2.sell_BE.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_product")
@Builder
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "product_id", length = 36, nullable = false)
    private String productId;

    @Column(name = "title",columnDefinition = "VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", nullable = false)
    private String title;

    @Column(name = "price", nullable = false, length = 18)
    private BigDecimal price;

    @Column(name = "number", nullable = false, length = 11)
    private int number;

    @Column(name = "thumbnail", columnDefinition = "LONGTEXT", nullable = false)
    private String thumbnail;

    @Column(name = "discount", nullable = false, length = 11)
    private int discount;

    @Column(name = "release_time", nullable = false, length = 11)
    private int releaseTime;

    @Column(name = "description", columnDefinition = "TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci", nullable = false)
    private String description;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @Column(name = "update_at")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateAt;

    @OneToMany(mappedBy="product")
    private Set<Comment> comments = new HashSet<>();

    @OneToMany(mappedBy = "product")
    private List<OrderDetails> orderDetails;

    @ManyToOne
    @JoinColumn(name = "product_type_id", referencedColumnName = "product_type_id")
    private ProductType productType;

    @OneToMany(mappedBy="product")
    private Set<ImgDesc> imgDesc = new HashSet<>();

    @OneToMany(mappedBy="product")
    private Set<DiscountText> discountTexts = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "config_id", referencedColumnName = "config_id")
    private Configuration configuration;
}
