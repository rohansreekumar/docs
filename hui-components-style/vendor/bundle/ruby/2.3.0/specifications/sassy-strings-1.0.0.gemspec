# -*- encoding: utf-8 -*-
# stub: sassy-strings 1.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "sassy-strings".freeze
  s.version = "1.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.2".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sam Richard".freeze]
  s.date = "2013-08-16"
  s.description = "Superpower Strings!".freeze
  s.email = ["snugug@gmail.com".freeze]
  s.homepage = "https://github.com/snugug/sassy-strings".freeze
  s.licenses = ["MIT".freeze]
  s.rubyforge_project = "sassy-strings".freeze
  s.rubygems_version = "2.6.6".freeze
  s.summary = "Advanced String handling for Sass".freeze

  s.installed_by_version = "2.6.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<compass>.freeze, [">= 0.12.2"])
    else
      s.add_dependency(%q<compass>.freeze, [">= 0.12.2"])
    end
  else
    s.add_dependency(%q<compass>.freeze, [">= 0.12.2"])
  end
end
