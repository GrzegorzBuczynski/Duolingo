package com.mojelingo.user;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public String test() {
        return "Backend działa";
    }
}