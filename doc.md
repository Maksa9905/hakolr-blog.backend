<style>
    GET::before {
        content: "GET: ";
        color: #3483eb;
        font-weight: 700;
    }

    POST::before {
        content: "POST: ";
        color: #0fdb42;
        font-weight: 700;
    }

    DELETE::before {
        content: "DELETE: ";
        color: #eb2e28;
        font-weight: 700;
    }

    PUT::before {
        content: "PUT: ";
        color: #eba01e;
        font-weight: 700;
    }

    PATCH::before { 
        content: "PATCH: ";
        color: yellow;
        font-weight: 700;
    }
</style>


# Technical documentation for the `hakolr-blog` project 

## Paragraph 1: API routes

### `Posts`

1. <GET>`/posts`</GET> - taking posts list

    input: 
    ```json
    queryParams = {
        "page": "number",
        "limit": "number"
    }
    ```

    output:
    ```
    {
        
    }
    ```


<POST></POST>

<DELETE></DELETE>

<PUT></PUT>

<PATCH></PATCH>