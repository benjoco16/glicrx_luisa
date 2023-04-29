<?php
// Add navigation menu to save token
add_action( 'admin_menu', 'my_plugin_add_menu' );
function my_plugin_add_menu() {
  add_menu_page(
    'GlicRX Settings',
    'GlicRX',
    'manage_options',
    'my-plugin-settings',
    'my_plugin_settings_page'
  );
}

// Display settings page
function my_plugin_settings_page() {
  // Save token on form submission
  if ( isset( $_POST['glicrx_st'] ) ) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'glicrx_st';
    $token = md5( sanitize_text_field( $_POST['glicrx_st'] ) );
    $wpdb->insert( $table_name, array( 'token' => $token ) );
    echo '<div class="updated"><p>Token saved successfully!</p></div>';
  }

  // Get current token
  global $wpdb;
  $table_name = $wpdb->prefix . 'glicrx_st';
  $current_token = $wpdb->get_var( "SELECT token FROM $table_name ORDER BY id DESC LIMIT 1" );


  // Display form
  ?>
  
  <div class="wrap">
    <h1>GlicRX Settings</h1>
    <br>
    <?php if ( $current_token ) : ?>
      <div class="updated"><p>Current token: <?php echo $current_token; ?></p></div>
    <?php endif; ?>
    <form method="post">
      <label for="glicrx_st">Save Your Token:</label>
      <input type="text" name="glicrx_st" id="glicrx_st" />
      <?php submit_button( 'Save' ); ?>
    </form>
  </div>
  <?php
}