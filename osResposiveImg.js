ResponsiveImage();
function ResponsiveImage() {
    /*
     * Bir img tagına eklediğiniz responsive seçenekler şu şekilde senoryoya tabi tutulurlar.
     * (Bir img etiketine veya herhangi bir elementin arkaplanı için bu method kullanılabilir, sadece json verisine type = src veya type = bg yazmalısınız. src = img tagı için, bg = herhangi bir elemente uygulayacağınız bg içindir.)
     * 
     * 1) Bootstrap grid responsive yapısı mantığında çalışır.
     * 2) min576 değeri girilmişse src deki link 576 nın altındaki ekranlarda gösterilir.
     * 3) Örneğin; min992 değeri girilmiş, ama min576 ve min768 değerleri girilmemişse src değeri 0px den 992px e kadar gösterilir. min992 deki değer de 992 ve üstündeki ekranlarda gösterilir.
     * 4) Örneğin; min768 girilmiş ve min1200 girilmiş ise; 0px den 768px e kadar src deki değer, 768px den 1200px e kadar min768 deki değer, 1200px den sonra min1200 deki değer gösterilir.
     *
     * HTML tarafta json verisindeki değerleri mutlaka tek tırnak içine alın.
     *
     *<img src="assets/img/about-img.jpg" data-responsive-img="{'type': 'src', 'src': 'http://via.placeholder.com/576x300','min576': 'http://via.placeholder.com/768x280','min768': 'http://via.placeholder.com/992x300','min992': 'http://via.placeholder.com/1140x320','min1200': 'assets/img/about-img.jpg'}" data-aos="fadeIn" data-aos-duration="600" data-aos-offset="-200" data-aos-delay="0" />
     *<div data-responsive-img="{'type': 'src', 'src': 'http://via.placeholder.com/576x300','min576': 'http://via.placeholder.com/768x280','min768': 'http://via.placeholder.com/992x300','min992': 'http://via.placeholder.com/1140x320','min1200': 'assets/img/about-img.jpg'}" data-aos="fadeIn" data-aos-duration="600" data-aos-offset="-200" data-aos-delay="0" />
     *
     * 
     */
    // type == src or bg
    $('[data-responsive-img]').each(function () {
        //var Json = { 'type': 'src', 'src': 'http://via.placeholder.com/480x320', 'min576': 'http://via.placeholder.com/576x420', 'min768': 'http://via.placeholder.com/768x500', 'min992': 'http://via.placeholder.com/992x600', 'min1200:' 'http://via.placeholder.com/1200x900' }
        var GetJSon = $(this).attr("data-responsive-img").replace(new RegExp("\'", "gm"), '"');
        var Json = JSON.parse(GetJSon);
        var Image = Json.src;
        if (matchMedia('screen and (min-width: 576px)').matches) {
            Image = Json.min576;
        }
        if (matchMedia('screen and (min-width: 768px)').matches) {
            Image = Json.min768;
        }
        if (matchMedia('screen and (min-width: 992px)').matches) {
            Image = Json.min992;
        }
        if (matchMedia('screen and (min-width: 1200px)').matches) {
            Image = Json.min1200;
        }
        if (Json.type == "bg") {
            $(this).css("background-image", "url(" + Image + ")");
        }
        if (Json.type == "src") {
            $(this).attr("src", Image);
        }
    });
}

var resizeTimer;
$(window).on('resize', function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        ResponsiveImage();
    }, 250);
});
