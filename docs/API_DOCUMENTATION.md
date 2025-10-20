# API Documentation

This document provides a detailed overview of the API endpoints for the VYGUGA e-commerce application.

## Authentication

Authentication is handled via Google OAuth. See the `OAUTH_GUIDE.md` for more information. All API endpoints that require authentication will return a `401 Unauthorized` error if the user is not logged in.

## Products

### `GET /api/products`

-   **Description:** Fetches a list of all products.
-   **Authentication:** Not required.
-   **Response:**
    ```json
    [
      {
        "id": 1,
        "name": "Product Name",
        "description": "Product Description",
        "price": "99.99",
        "imageUrl": "http://example.com/image.jpg",
        "createdAt": "2023-10-27T10:00:00.000Z"
      }
    ]
    ```

### `GET /api/products/:id`

-   **Description:** Fetches a single product by its ID.
-   **Authentication:** Not required.
-   **Parameters:**
    -   `id` (number): The ID of the product.
-   **Response:**
    -   `200 OK`: A single product object.
    -   `404 Not Found`: If the product does not exist.

## Cart

### `GET /api/cart`

-   **Description:** Fetches the current user's shopping cart.
-   **Authentication:** Required.
-   **Response:**
    ```json
    {
      "id": 1,
      "userId": 1,
      "createdAt": "2023-10-27T10:00:00.000Z",
      "cartItems": [
        {
          "id": 1,
          "cartId": 1,
          "productId": 1,
          "quantity": 2,
          "product": { ... }
        }
      ]
    }
    ```

### `POST /api/cart`

-   **Description:** Adds an item to the user's cart. If the item already exists, its quantity is updated.
-   **Authentication:** Required.
-   **Request Body:**
    ```json
    {
      "productId": 1,
      "quantity": 1
    }
    ```
-   **Response:**
    -   `201 Created`: If the item was added successfully.

### `DELETE /api/cart/items/:id`

-   **Description:** Removes an item from the user's cart.
-   **Authentication:** Required.
-   **Parameters:**
    -   `id` (number): The ID of the cart item.
-   **Response:**
    -   `200 OK`: If the item was removed successfully.

## Checkout

### `POST /api/checkout`

-   **Description:** A simplified checkout process that creates an order from the user's cart.
-   **Authentication:** Required.
-   **Response:**
    -   `201 Created`: If the checkout was successful.
        ```json
        {
          "message": "Checkout successful",
          "orderId": 1
        }
        ```
    -   `400 Bad Request`: If the cart is empty.
