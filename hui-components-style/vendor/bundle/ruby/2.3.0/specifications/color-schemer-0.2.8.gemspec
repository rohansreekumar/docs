# -*- encoding: utf-8 -*-
# stub: color-schemer 0.2.8 ruby lib

Gem::Specification.new do |s|
  s.name = "color-schemer".freeze
  s.version = "0.2.8"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.5".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Scott Kellum".freeze, "Mason Wendell".freeze]
  s.date = "2011-10-06"
  s.description = "Create color schemes with ease.".freeze
  s.email = ["scott@scottkellum.com".freeze]
  s.homepage = "https://github.com/scottkellum/color-schemer".freeze
  s.rubyforge_project = "color-schemer".freeze
  s.rubygems_version = "2.6.6".freeze
  s.summary = "Create color schemes with ease.".freeze

  s.installed_by_version = "2.6.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<compass-blend-modes>.freeze, ["~> 0.0.2"])
    else
      s.add_dependency(%q<compass-blend-modes>.freeze, ["~> 0.0.2"])
    end
  else
    s.add_dependency(%q<compass-blend-modes>.freeze, ["~> 0.0.2"])
  end
end
