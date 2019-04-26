<div class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapseable">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="navbar-brand">
        <a>BatIdentification</a>
      </div>
    </div>
    <div class="collapse navbar-collapse" id="collapseable">
      <ul class="nav navbar-nav">
        <li><a id="/index" href="/">Home</a></li>
        <li><a id="about" href="/data">Data</a></li>
        <li><a id="brand-title">Research@BatIdentification</a>
        <li><a id="identify" href="/identify">Articles</a></li>
        <?php if(isset($_SESSION['id'])) : ?>
          <li><a href="/profile" id="profile"><?php echo($_SESSION['username']); ?></a></li>
        <?php else : ?>
          <?php
            $host = explode(".", $_SERVER['HTTP_HOST'], 2)[1];
            $_SESSION['ref'] = "https://research.{$host}";
          ?>
          <li><a href="https://<?php echo $host?>/login" id="login">Login / Signup</a></li>
        <?php endif ?>
      </ul>
    </div>
  </div>
  <script type="text/javascript">
    $(document).ready(function(){
      var url = window.location.pathname;
      if(url == "/"){
        $("#index").addClass("selected")
      }else{
        url = url.replace("/", "");
        $("#" + url).addClass("selected");
      }
    })
  </script>
</div>
