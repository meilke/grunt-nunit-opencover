var expect = require('expect.js'),
    opencover = require('../tasks/opencover.js');

describe('opencover', function() {

  it('should wrap the NUnit command', function() {

    var command = {
      path: 'to/nunit',
      args: ['first_arg', 'second_arg']
    };

    var options = { coverPath: 'to/cover' };

    var result = opencover.wrapCommand(command, options);
    expect(result.path).to.be('to/cover');
    expect(result.args).to.contain('-target:"to/nunit"');
    expect(result.args).to.contain('-targetargs:"first_arg second_arg"');
    expect(result.args).to.contain('-output:_CodeCoverageResult.xml');
    expect(result.args).to.contain('-register:user');
    expect(result.args).to.contain('-returntargetcode');

  });

});