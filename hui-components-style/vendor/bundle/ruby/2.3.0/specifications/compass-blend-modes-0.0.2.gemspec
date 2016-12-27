# -*- encoding: utf-8 -*-
# stub: compass-blend-modes 0.0.2 ruby lib

Gem::Specification.new do |s|
  s.name = "compass-blend-modes".freeze
  s.version = "0.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Grady Kuhnline".freeze]
  s.date = "2013-03-23"
  s.description = "Using standard color blending functions in Sass.".freeze
  s.email = ["github@heygrady.net".freeze]
  s.homepage = "https://github.com/heygrady/scss-blend-modes".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.6.6".freeze
  s.summary = "Using standard color blending functions in Sass.".freeze

  s.installed_by_version = "2.6.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<compass>.freeze, [">= 0"])
    else
      s.add_dependency(%q<compass>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<compass>.freeze, [">= 0"])
  end
end
