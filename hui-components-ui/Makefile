test:
		@grunt test
test-cov:
		@grunt test-coverage
test-cov-html:
		@grunt test-coverage-html
test-bamboo:
		@./node_modules/karma/bin/karma start config/test/karma-unit-bamboo.conf.js
test-cov-bamboo:
		@./node_modules/karma/bin/karma start config/test/karma-unit-bamboo-coverage.conf.js
test-code-style:
		@node node_modules/jscs/bin/jscs -c .jscsrc ./lib
test-code-style-bamboo:
		@node node_modules/jscs/bin/jscs -c .jscsrc -r junit ./lib > coverage-code-style-report.xml
jshint:
		@jshint .
jshint-bamboo:
		@jshint --reporter=./node_modules/jshint-junit-reporter/reporter.js . > coverage-jshint-report.xml


.PHONY: test test-cov test-cov-html test-bamboo test-cov-bamboo jshint jshint-bamboo test-code-style test-code-style-bamboo
