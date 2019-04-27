<?php

  session_name("batidentification");
  session_set_cookie_params(0, '/', '.batidentification.com');
  session_start();

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Research Data</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/ol.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
    <script type="text/javascript" src="js/ol.js"></script>
    <script type="text/javascript" src="js/data.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <?php
      include("includes/navigation.php");
    ?>
    <div class="content container-fluid data-container">

      <div class="row">

        <div class="col-md-8">

          <h3 id="no-calls-queryed"> No calls currently queryed </h3>

          <div class="queryed-info">

            <h3 id="call-count">Calls: </h3>

            <table id="species-count">

            </table>

            <div class="queryed-buttons">

              <a href="" id="preview_link"><button class="btn queryed-button" id="preview"> View Data </button></a>

            </div>

          </div>

        </div>

        <div class="col-md-4 side-bar">

            <h3> Filter Data </h3>

            <h4> Species </h4>

            <div id="bat-species">

              <table></table>

            </div>

            <div id="date">

              <h4> Date </h4>

              <input type="text" class="form-control" id="date_range" name="date_range">

              <script type="text/javascript">

                $(document).ready(function() {

                  $('#date_range').daterangepicker({
                    opens: 'left',
                    startDate: "2017-07-18",
                    endDate: new Date(),
                    locale: {
                        "format": "YYYY-MM-DD",
                        "cancelLabel": "Reset"
                    }
                  });

                  $('#date_range').on('cancel.daterangepicker', function(ev, picker) {
                      $(this).data('daterangepicker').setStartDate("2017-07-18");
                      $(this).data('daterangepicker').setEndDate(new Date());
                  });

                });


              </script>

            </div>

            <div id="location">

              <button id="select-location" class="btn">Select location</button>

              <input type="hidden" name="radius" id="radius">

              <input type="hidden" name="lat" id="lat">

              <input type="hidden" name="lon" id="lon">

            </div>

            <button class="btn" id="submit-btn">Filter</button>

        </div>

      </div>

    </div>
    <div class="overlay">
        <div class="map-container">
          <h2>Select a location</h2>
          <div id="location-picker">
          </div>
          <input type="range" min="1" max="200" value="1" id="location-picker-radius" name="location-picker-range">
          <label for="location-picker-range" id="location-picker-label">Radius: 1km</label>
          <div>
            <button class="btn btn-primary" id="finish-overlay">Done</button>
            <button class="btn btn-danger" id="cancel-overlay">Disregard</button>
          </div>
        </div>
    </div>
    <?php
      include("includes/footer.php");
    ?>
  </body>
</html>
