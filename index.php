<?php

  session_name("batidentification");
  session_set_cookie_params(0, '/', '.batidentification.com');
  session_start();
  
?>
<html lang="en">
  <head>
    <title>BatIdentification - Research Portal</title>
    <meta name="description" content="BatIdentification provides a wealth of data for researchers to access. Data, articles, FAQs can all be seen here.">
    <link rel=”canonical” href=”https://research.batidentification.com”/>
    <meta name=”viewport” content=”width=device-width,initial-scale=1″>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/ol.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/ol.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
  </head>
  <body>
    <?php
      include("includes/navigation.php");
    ?>
    <div class="landing">
      <div id="heatmap">
      </div>
    </div>
    <div class="container content">
        <div class="research-info">
          <img src="images/bat.png" id="research-information-img">
          <div class="floating-content" id="top-left">
              <b>Access bat calls</b>
              <p>We are collecting bat calls from <i> citizen-scientists </i> around the world for you to access</p>
              <p>From Soprano Pipistrelles to Brown-Long Eared we have them all</p>
          </div>
          <div class="floating-content" id="top-right">
            <b>Crowdsource metadata</b>
            <p>Want to filter by specific locations? Have some piece metadata in mind?</p>
            <p>Query by location, data recorded or species. Get in contact with us and we'll you get anything else </p>
          </div>
          <div class="floating-content" id="bottom-left">
            <b>Contribute articles</b>
            <p>Are you involved in using <i>citizen-science</i> in bat conservation? Have you used some of our data for your paper?</p>
            <p> We love hearing what researchers are doing with BatIdentification, so go ahead and submit your articles!</p>
          </div>
          <div class="floating-content" id="bottom-right">
            <b>Link citizen-science applications</b>
            <p>Do you want to integrate citizen science for new aspect of bat conservation?</p>
            <p>We're always happy to help people involve the masses in their work. Use our system to streamline your job</p>
          </div>
        </div>
        <?php
          include("includes/footer.php")
        ?>
    </div>
  </body>
</html>
