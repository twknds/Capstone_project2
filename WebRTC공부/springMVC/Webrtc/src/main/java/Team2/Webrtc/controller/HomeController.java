package Team2.Webrtc.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@Slf4j
@RequiredArgsConstructor
public class HomeController {

    /**
     * 노드 서버로 연결
     * @param id
     * @return
     */
    @GetMapping("/node")
    public String node(String id){
        log.info("node, id {}",id);
        return "redirect:https://172.30.1.34:3000/";
    }

    @GetMapping("/call")
    public String call(){
        log.info("call");
        return "redirect:https://172.30.1.34:3000/call.html";
    }

    @GetMapping("/callee")
    public String callee(){
        log.info("callee");
        return "redirect:https://172.30.1.34:3000/callee.html";
    }
}
