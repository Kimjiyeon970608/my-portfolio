$(() => {
  // 커스텀 커서
  const cursor = $('.cursor');
  const follower = $('.cursor-follower');
  let posX = 0,
    posY = 0,
    mouseX = 0,
    mouseY = 0;

  TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
      posX += (mouseX - posX) / 9;
      posY += (mouseY - posY) / 9;

      TweenMax.set(follower, {
        css: {
          left: posX - 4,
          top: posY - 4
        }
      });
      TweenMax.set(cursor, {
        css: {
          left: mouseX - 10,
          top: mouseY - 10
        }
      });
    }
  });

  $(document).on('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  $('a').on({
    'mouseenter': function () {
      cursor.addClass('active');
      follower.addClass('active');
    },
    'mouseleave': function () {
      cursor.removeClass('active');
      follower.removeClass('active');
    }
  });

  // // // 상단 스크롤 게이지 바
  let txt = $(".txt");
  let bar = $(".progress .bar");

  function getPercent(sct) {
    // 스크롤진행율 계산 함수
    const scrollHeight = $(".wrap").height();
    const scrollRealHeight = scrollHeight - $(window).height();
    let scrollPercent = Math.floor((sct / scrollRealHeight) * 100);
    render(scrollPercent);
  }

  // // // nav <-> section 연결
  $("nav > ul > li > a").on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    var offset = $(target).offset().top;
    $("html, body").animate(
      {
        scrollTop: offset,
      },
      1000
    );
  });

  // // // btn
  $(".btn").mouseenter(function (e) {
    var parentOffset = $(this).offset();
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({ left: relX, top: relY });
    $(this).prev(".su_button_circle").removeClass("desplode-circle");
    $(this).prev(".su_button_circle").addClass("explode-circle");
  });

  $(".btn").mouseleave(function (e) {
    var parentOffset = $(this).offset();
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    $(this).prev(".su_button_circle").css({ left: relX, top: relY });
    $(this).prev(".su_button_circle").removeClass("explode-circle");
    $(this).prev(".su_button_circle").addClass("desplode-circle");
  });

  // 자동 텍스트 슬라이더
  function initTitleRol() {
    const titles = $('.title_rol .rol');
    let currentIndex = 0;

    // 초기 상태 설정
    titles.removeClass('active');
    $(titles[currentIndex]).addClass('active');

    // 3초마다 다음 텍스트로 전환
    setInterval(() => {
      $(titles[currentIndex]).removeClass('active');
      currentIndex = (currentIndex + 1) % titles.length;
      $(titles[currentIndex]).addClass('active');
    }, 3000);
  }

  // DOM이 준비되면 슬라이더 초기화
  initTitleRol();

  // // // loop text
  $(".text_loop").bxSlider({
    minSlides: 4,
    maxSlides: 4,
    slideWidth: 1440,
    ticker: true,
    speed: 9000,
  });

  // // //스크롤 애니메이트 about/project/educ
  let isVisibleEdu = false;
  let isVisiblePro = false;
  let isVisibleAbout = false;

  $(window).scroll(function () {
    let box_L = $(".about .photo");
    let box_R = $(".about .text");
    let t_text = $(".t_text");
    let m_text = $(".m_text");
    let b_text = $(".b_text");
    let b2_text = $(".b2_text");

    // // // about
    if (checkVisible($(".about")) && !isVisibleAbout) {
      box_L.delay(500).queue(function (next) {
        $(this).css({
          transform: "translateX(0)",
          transition: "0.5s",
        });
        next();
      });

      box_R.delay(500).queue(function (next) {
        $(this).css({
          transform: "translateX(0)",
          transition: "0.5s",
        });
        t_text.css({
          transform: "translateX(0)",
          transition: "0.5s",
          transitionDelay: "0.3s",
        });
        m_text.css({
          transform: "translateX(0)",
          transition: "0.5s",
          transitionDelay: "0.5s",
        });
        b_text.css({
          transform: "translateX(0)",
          transition: "0.5s",
          transitionDelay: "0.7s",
        });
        next();
      });
      isVisibleAbout = true;
    } else if (!checkVisible($(".about")) && isVisibleAbout) {
      box_L.css({
        transform: "translateX(-150%)",
        transition: "0.5s",
      });
      box_R.css({
        transform: "translateX(150%)",
        transition: "0.5s",
      });
      t_text.css({
        transform: "translateX(150%)",
        transition: "0.5s",
      });
      m_text.css({
        transform: "translateX(150%)",
        transition: "0.5s",
      });
      b_text.css({
        transform: "translateX(150%)",
        transition: "0.5s",
      });
      isVisibleAbout = false;
    }
  });

  $(window).scroll(function () {
    let box_L = $(".edu_box .box:nth-child(1)");
    let box_R = $(".edu_box .box:nth-child(2)");

    // education
    if (checkVisible($(".education")) && !isVisibleEdu) {
      box_L.delay(300).queue(function (next) {
        $(this).css({
          transform: "translateX(0)",
          transition: "0.5s",
        });
        next();
      });

      box_R.delay(300).queue(function (next) {
        $(this).css({
          transform: "translateX(0)",
          transition: "0.5s",
        });
        next();
      });
      isVisibleEdu = true;
    } else if (!checkVisible($(".education")) && isVisibleEdu) {
      box_L.css({
        transform: "translateX(-150%)",
        transition: "0.5s",
      });
      box_R.css({
        transform: "translateX(150%)",
        transition: "0.5s",
      });
      isVisibleEdu = false;
    }
  });

  // // // skill
  var isVisibleTool = false;

  $(window).scroll(function () {
    var toolWrap = $(".section.tool");
    var toolBars = toolWrap.find(".tool_bar");

    if (checkVisible(toolWrap) && !isVisibleTool) {
      toolBars.each(function (index) {
        var barElement = $(this).find(".bar");
        var percentValue = $(this).attr("data-percent");

        setTimeout(function () {
          barElement.animate(
            { width: percentValue },
            { duration: 500, easing: "swing" }
          );
        }, 800);
      });
      isVisibleTool = true;
    } else if (!checkVisible(toolWrap) && isVisibleTool) {
      toolBars.each(function (index) {
        $(this).find(".bar").css({ width: "0" });
      });
      isVisibleTool = false;
    }
  });

  function checkVisible(elm, evalType) {
    evalType = evalType || "object visible";
    var viewportHeight = $(window).height(),
      scrolltop = $(window).scrollTop(),
      y = elm.offset().top,
      elementHeight = elm.height();

    if (evalType == "object visible")
      return y < viewportHeight + scrolltop && y > scrolltop - elementHeight;

    if (evalType == "above") return y < viewportHeight + scrolltop;
  }

  // top photo
  $(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();
    var photo = $(".card .thumb");

    photo.css(
      "background-position-y",
      ((scrollTop / 4) % photo.height()) + "px"
    );
  });

  const o = $(".card");
  const o2 = $("img");
  $("#top").on("mousemove", function (e) {
    let x = -($(window).innerWidth() / 2 - e.pageX) / 100;
    let y = -($(window).innerHeight() / 2 - e.pageY) / 100;
    o.attr("style", `transform : rotateY(${x}deg) rotateX(${y}deg)`);
    o2.attr({
      style: `transform: rotateY(${e * 0.5
        }deg) rotateX(${y}deg) translateZ(20px) translateX(${y * 1.5}px)`,
    });
  });

  // top text
  const content = "KIM JI YEON";
  const text = document.querySelector(".section.home .h1");
  let i = 0;

  function typing() {
    if (i < content.length) {
      let txt = content.charAt(i);
      text.innerHTML += txt;
      i++;
    } else {
      clearInterval(intervalId);
    } ㄹ
  }

  const intervalId = setInterval(typing, 200);

  // // //.section.projects
  $(window).scroll(function () {
    let box_L = $(".pro_wrap li:nth-child(1)");
    let box_R = $(".pro_wrap li:nth-child(2)");
    let box_L2 = $(".pro_wrap li:nth-child(3)");
    let box_R3 = $(".pro_wrap li:nth-child(4)");
    let box_L3 = $(".pro_wrap li:nth-child(5)");
    let box_R4 = $(".pro_wrap li:nth-child(6)");

    if (checkVisible($(".section.projects")) && !isVisiblePro) {
      box_L.delay(300).queue(function (next) {
        $(this).css({
          transform: "translateY(0)",
          transition: "0.5s",
        });
        next();
      });

      box_R.delay(300).queue(function (next) {
        $(this).css({
          transform: "translateY(0)",
          transition: "1s",
        });
        next();
      });
      box_L2.delay(300).queue(function (next) {
        $(this).css({
          transform: "translateY(0)",
          transition: "1.5s",
        });
        next();
      });
      box_R3.delay(300).queue(function (next) {
        $(this).css({
          transform: "translateY(0)",
          transition: "2s",
        });
        next();
      });
      box_L3.delay(300).queue(function (next) {
        $(this).css({
          transform: "translateY(0)",
          transition: "2.5s",
        });
        next();
      });
      box_R4.delay(300).queue(function (next) {
        $(this).css({
          transform: "translateY(0)",
          transition: "3s",
        });
        next();
      });
      isVisiblePro = true;
    } else if (!checkVisible($(".section.projects")) && isVisiblePro) {
      box_L.css({
        transform: "translateY(240%)",
        transition: "0.5s",
      });
      box_R.css({
        transform: "translateY(240%)",
        transition: "0.5s",
      });
      box_L2.css({
        transform: "translateY(240%)",
        transition: "0.5s",
      });
      box_R3.css({
        transform: "translateY(240%)",
        transition: "0.5s",
      });
      box_L3.css({
        transform: "translateY(240%)",
        transition: "0.5s",
      });
      box_R4.css({
        transform: "translateY(240%)",
        transition: "0.5s",
      });
      isVisiblePro = false;
    }
  });

  function checkVisible(element) {
    let windowHeight = $(window).height();
    let scrollTop = $(window).scrollTop();
    let offsetTop = element.offset().top;

    return scrollTop + windowHeight > offsetTop;
  }

  // // // artwork img hover event

  $(".tab-content li").hover(
    function () {
      var image = $(this).find(".img_hover img");
      var imageHeight = image.height();
      var containerHeight = $(this).height();
      var topValue = "-" + (imageHeight * 60) / containerHeight + "%";
      image.stop().animate({ top: topValue }, 3000);
    },
    function () {
      $(this).find(".img_hover img").stop().animate({ top: "0%" }, 3000);
    }
  );

  function render(scrollPercent) {
    // 스크롤바 애니메이트 함수
    if (scrollPercent >= 100) {
      scrollPercent = 100;
    }
    txt.text(scrollPercent + "%");
    bar.css("width", scrollPercent + "%");
  }

  $(window).on("scroll", function () {
    // 윈도우 스크롤 양을 얻어오는 함수
    let sct = $(this).scrollTop();
    getPercent(sct);
  });
  // // //xw
  $("#content1.carousel").slick({
    slidesToShow: 3,
    variableWidth: true,
  });

  $(".tab-button").on("click", function () {
    var tabButtonId = $(this).attr("id");
    $(".tab-button").removeClass("active");
    $(".tab-content").removeClass("active");

    $(this).addClass("active");
    var targetContent = $("#" + "content" + tabButtonId.slice(-1));
    targetContent.addClass("active");

    if (targetContent.hasClass("slick-initialized")) {
      targetContent.slick("unslick");
    }
    targetContent.slick({
      slidesToShow: 3,
      variableWidth: true,
    });
  });

  $(".popup").magnificPopup({ type: "image" });
});