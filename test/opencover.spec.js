var expect = require('expect.js'),
    opencover = require('../tasks/opencover.js');

describe('opencover', function() {

  var command = {
    path: 'to/nunit',
    args: ['first_arg', 'second_arg']
  };

  var options = {
    coverPath: 'to/cover',
    coverExcludeAttributeFilter: 'ceaFilter',
    coverFilter: 'cFilter'
  };

  var result = opencover.wrapCommand(command, options);

  it('should wrap the OpenCover command', function() {
    expect(result.path).to.be('to/cover');
  });

  it('should wrap the NUnit command', function() {
    expect(result.args).to.contain('-target:"to/nunit"');
  });

  it('should wrap the NUnit arguments', function() {    
    expect(result.args).to.contain('-targetargs:"first_arg second_arg"');
  });

  it('should set the default XML output path', function() {
    expect(result.args).to.contain('-output:_CodeCoverageResult.xml');
  });

  it('should set the XML output path', function() {
    var specialResult = opencover.wrapCommand(command, {
      coverPath: 'to/cover',
      coverReportFilePath: 'some/path'
    });
    expect(specialResult.args).to.contain('-output:"some/path"');
  });

  it('should use the register:user option', function() {
    expect(result.args).to.contain('-register:user');
  });

  it('should use the returntargetcode option', function() {
    expect(result.args).to.contain('-returntargetcode');
  });

  it('should set an exclude attribute filter', function() {
    expect(result.args).to.contain('-excludebyattribute:"ceaFilter"');
  });

  it('should not set an exclude attribute filter', function() {
    var specialResult = opencover.wrapCommand(command, {
      coverPath: 'to/cover'
    });
    expect(specialResult.args).to.not.contain('-excludebyattribute');
  });

  it('should set the filter option', function() {
    expect(result.args).to.contain('-filter:"cFilter"');
  });

  it('should not set the filter option', function() {
    var specialResult = opencover.wrapCommand(command, {
      coverPath: 'to/cover'
    });
    expect(specialResult.args).to.not.contain('-filter');
  });

});