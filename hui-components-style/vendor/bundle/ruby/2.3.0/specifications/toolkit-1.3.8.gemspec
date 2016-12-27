# -*- encoding: utf-8 -*-
# stub: toolkit 1.3.8 ruby lib

Gem::Specification.new do |s|
  s.name = "toolkit".freeze
  s.version = "1.3.8"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.2".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sam Richard".freeze, "Scott Kellum".freeze, "Mason Wendell".freeze]
  s.date = "2013-09-07"
  s.description = "Toolkit for Progressive Enhancement and Responsive Web Design".freeze
  s.email = ["sam@snug.ug".freeze, "scott@scottkellum.com".freeze, "mason@zivtech.com".freeze]
  s.homepage = "https://github.com/Snugug/toolkit".freeze
  s.licenses = ["MIT".freeze, "GPL".freeze]
  s.rubyforge_project = "toolkit".freeze
  s.rubygems_version = "2.6.6".freeze
  s.summary = "Progressive Enhancement and RWD toolkit of awesomeness".freeze

  s.installed_by_version = "2.6.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<compass>.freeze, [">= 0.12.2"])
      s.add_runtime_dependency(%q<singularitygs>.freeze, [">= 1.1.2"])
      s.add_runtime_dependency(%q<breakpoint>.freeze, [">= 2.0.6"])
      s.add_runtime_dependency(%q<sassy-strings>.freeze, [">= 1.0.0"])
      s.add_runtime_dependency(%q<color-schemer>.freeze, [">= 0.2.7"])
    else
      s.add_dependency(%q<compass>.freeze, [">= 0.12.2"])
      s.add_dependency(%q<singularitygs>.freeze, [">= 1.1.2"])
      s.add_dependency(%q<breakpoint>.freeze, [">= 2.0.6"])
      s.add_dependency(%q<sassy-strings>.freeze, [">= 1.0.0"])
      s.add_dependency(%q<color-schemer>.freeze, [">= 0.2.7"])
    end
  else
    s.add_dependency(%q<compass>.freeze, [">= 0.12.2"])
    s.add_dependency(%q<singularitygs>.freeze, [">= 1.1.2"])
    s.add_dependency(%q<breakpoint>.freeze, [">= 2.0.6"])
    s.add_dependency(%q<sassy-strings>.freeze, [">= 1.0.0"])
    s.add_dependency(%q<color-schemer>.freeze, [">= 0.2.7"])
  end
end
