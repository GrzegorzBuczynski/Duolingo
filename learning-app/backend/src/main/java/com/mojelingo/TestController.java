package com.mojelingo;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test")
    public String test() {
        return "Backend działa!";
    }
}