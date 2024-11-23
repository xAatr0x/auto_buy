<?php

return [

    'paths' => ['api/*'],
    'allowed_methods' => ['*'], // Можна обмежити, наприклад, тільки GET, POST, PUT, DELETE
    'allowed_origins' => ['*'], // Додайте свій фронтенд-домен
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,

];
