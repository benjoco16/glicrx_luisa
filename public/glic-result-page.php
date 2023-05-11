<?php
   foreach ($_POST as $key => $value) {
        echo "Field ".htmlspecialchars($key)." is ".htmlspecialchars($value)."<br>";
    }
?>
 <div class="wrap">
    <h1><?php //echo esc_html( get_admin_page_title() ); ?></h1>

    <div class="my-custom-plugin-container">
      <div class="my-custom-plugin-left">
        <!-- Left column form goes here -->
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email">
          <button type="submit">Submit</button>
        </form>
      </div>

      <div class="my-custom-plugin-right">
        <!-- Right column form and map goes here -->
        <form>
          <label for="address">Address:</label>
          <input type="text" id="address" name="address">
          <label for="city">City:</label>
          <input type="text" id="city" name="city">
          <button type="submit">Submit</button>
        </form>

        <div id="map"></div>
        <iframe 
  width="600" 
  height="450" 
  frameborder="0" 
  style="border:0" 
  src="https://www.google.com/maps/embed/v1/place?q=Tucson&key=YOUR_API_KEY" 
  allowfullscreen>
</iframe>

      </div>
    </div>

  </div>