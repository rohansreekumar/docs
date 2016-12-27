require 'rubygems'
require 'bundler/setup'

require 'toolkit'
require 'breakpoint'


css_dir = '.tmp/public/css'
sass_dir = 'src/scss'
javascripts_dir = 'client/scripts/src'
images_dir = 'assets/images'
fonts_dir = 'assets/fonts'

# relative_assets = 'true'
# http_generated_images_path = '/media/portalimgcache'
http_fonts_path = '/fonts'
http_images_path = '/images'
http_javascripts_dir = '/js'

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
# output_style = :nested

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

Compass::BrowserSupport.add_support("prefixThis", "webkit", "moz", "o", "ms")


# remove cache buster from assets other than sprites
asset_cache_buster :none

# Rename sprites to remove the Compass-generated hash 
# http://blog.behance.net/dev/compass-and-slicy-will-make-your-sprites-and-write-your-css

on_sprite_saved do |filename|
  if File.exists?(filename)
    FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
  end
end

# http://stackoverflow.com/questions/9183133/how-to-turn-off-compass-sass-cache-busting
# Replace in stylesheets generated references to sprites
# by their counterparts without the hash uniqueness.

# # only useful because it prevents missing asset reference - AH
on_stylesheet_saved do |filename|
  if File.exists?(filename)
    css = File.read filename
    File.open(filename, 'w+') do |f|
      f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
    end
  end
end

# https://gist.github.com/MoOx/1671259
# module Sass::Script::Functions
#    def error(message)
#      raise Sass::SyntaxError, message.value
#    end
# end
