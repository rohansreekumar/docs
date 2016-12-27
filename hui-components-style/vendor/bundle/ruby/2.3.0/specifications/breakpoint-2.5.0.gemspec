# -*- encoding: utf-8 -*-
# stub: breakpoint 2.5.0 ruby lib

Gem::Specification.new do |s|
  s.name = "breakpoint".freeze
  s.version = "2.5.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Mason Wendell".freeze, "Sam Richard".freeze]
  s.date = "2014-08-05"
  s.description = "Really simple media queries in Sass".freeze
  s.email = ["mason@thecodingdesigner.com".freeze, "sam@snug.ug".freeze]
  s.homepage = "https://github.com/Team-Sass/breakpoint".freeze
  s.licenses = ["MIT".freeze, "GPL-2.0".freeze]
  s.rubyforge_project = "breakpoint".freeze
  s.rubygems_version = "2.6.6".freeze
  s.summary = "An easy to use system for writing and managing media queries.".freeze

  s.installed_by_version = "2.6.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<sass>.freeze, ["~> 3.3"])
      s.add_runtime_dependency(%q<sassy-maps>.freeze, ["< 1.0.0"])
    else
      s.add_dependency(%q<sass>.freeze, ["~> 3.3"])
      s.add_dependency(%q<sassy-maps>.freeze, ["< 1.0.0"])
    end
  else
    s.add_dependency(%q<sass>.freeze, ["~> 3.3"])
    s.add_dependency(%q<sassy-maps>.freeze, ["< 1.0.0"])
  end
end
